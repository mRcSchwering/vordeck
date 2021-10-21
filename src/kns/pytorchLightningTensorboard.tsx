import { P, H4, Link, Code, BlockCode, Img } from "./components";

const loggerPy = `from typing import Dict
from pytorch_lightning.loggers import TensorBoardLogger
from pytorch_lightning.loggers.base import rank_zero_only
from torch.utils.tensorboard.summary import hparams


class MyTensorBoardLogger(TensorBoardLogger):
    def log_hyperparams(self, params: Dict[str, any], metrics: Dict[str, any] = None):
        pass

    @rank_zero_only
    def log_hyperparams_metrics(
        self, params: Dict[str, any], metrics: Dict[str, any] = None
    ):
        params = self._convert_params(params)
        params = self._flatten_dict(params)
        sanitized_params = self._sanitize_params(params)
        if metrics is None:
            metrics = {}
        exp, ssi, sei = hparams(sanitized_params, metrics)
        writer = self.experiment._get_file_writer()
        writer.add_summary(exp)
        writer.add_summary(ssi)
        writer.add_summary(sei)
        self.tags.update(sanitized_params)`;

const mymodulePy = `from typing import List
import torch
import pytorch_lightning as pl


class MyBaseModule(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.best_val_loss = 999.9

    def on_train_start(self):
        self.logger.log_hyperparams_metrics(
            self.hparams, {"best_val_loss": self.best_val_loss}
        )

    def validation_epoch_end(self, val_steps: List[dict]) -> dict:
        return self._get_epoch_results(val_steps, "val")

    def training_epoch_end(self, train_steps: List[dict]) -> dict:
        return self._get_epoch_results(train_steps, "train")

    def _get_epoch_results(self, steps: List[dict], partition: str) -> dict:
        targets = torch.cat([d["targets"] for d in steps], dim=0)
        predictions = torch.cat([d["predictions"] for d in steps], dim=0)
        loss = float(
            (torch.stack([d["loss"] for d in steps]).sum() / len(targets)).cpu().numpy()
        )

        log = {f"metrics/{partition}_loss": loss}
        if partition == "val":
            if loss < self.best_val_loss:
                self.best_val_loss = loss
            log["metrics/best_val_loss"] = self.best_val_loss
        
        for name, metric in self.metrics.items():
            log[f"metrics/{partition}_{name}"] = metric(targets, predictions)

        return {f"{partition}_loss": loss, "log": log}`;

const modulePy = `from torch.utils.data import DataLoader
import torch.nn.functional as F
import torch.optim as optim
from modules import MyBaseModule
from dataloading import MyData
from modeling import MyModel

N_CPUS = 8


class MyModule(MyBaseModule):
    def __init__(self, hparams: dict, metrics: dict):
        super().__init__()
        self.hparams = hparams
        self.metrics = metrics
        self.net = MyModel(10, 16, 2)
        self.criterion = F.cross_entropy

    def forward(self, x):
        return self.net(x)

    def train_dataloader(self):
        return DataLoader(
            dataset=MyData(200, 10),
            batch_size=self.hparams["batch-size"],
            num_workers=int(N_CPUS),
        )

    def val_dataloader(self):
        return DataLoader(
            dataset=MyData(100, 10),
            batch_size=self.hparams["batch-size"],
            num_workers=int(N_CPUS),
        )

    def configure_optimizers(self):
        optimizer1 = optim.Adam(self.parameters(), lr=self.hparams["start-lr"])
        scheduler1 = optim.lr_scheduler.ReduceLROnPlateau(
            optimizer1, factor=0.5, patience=20, verbose=True
        )
        return [optimizer1], [scheduler1]

    def training_step(self, batch, batch_idx: int) -> dict:
        return self._forward_pass(*batch)

    def validation_step(self, batch, batch_idx: int) -> dict:
        return self._forward_pass(*batch)

    def _forward_pass(self, x, y) -> float:
        preds = self.forward(x)
        loss = self.criterion(preds, y)
        return {"loss": loss, "preds": preds, "targets": y}`;

const trainerPy = `import random
from pathlib import Path
from sklearn.metrics import roc_auc_score
import torch
import pytorch_lightning as pl
from pytorch_lightning import Trainer
from logger import MyTensorBoardLogger
from module import MyModule

THIS_DIR = Path(__file__).parent.absolute()


class RocAuc:
    def __call__(self, targets: torch.Tensor, predictions: torch.Tensor):
        return roc_auc_score(
            targets.cpu().detach().numpy(), predictions[:, 1].cpu().detach().numpy()
        )


def main(hparams: dict, run_i: int):
    print(f"starting {hparams}")

    metrics = {"auc": RocAuc()}
    module = MyModule(hparams, metrics=metrics)
    logger = MyTensorBoardLogger(str(THIS_DIR / "__logs__"), name=str(run_i))

    trainer = Trainer(
        logger=logger,
        max_epochs=hparams["max-epochs"],
        early_stop_callback=pl.callbacks.EarlyStopping(patience=50),
    )
    trainer.fit(module)


if __name__ == "__main__":
    n_rounds = 1
    max_epochs = 100
    folds = ("fold1", "fold2")
    batch_sizes = (32, 64)
    lrs = (1e-3, 1e-4)

    for round_i in range(n_rounds):
        for fold in folds:
            args = {
                "round": round_i,
                "batch-size": random.choice(batch_sizes),
                "start-lr": random.choice(lrs),
                "fold": fold,
                "max-epochs": max_epochs,
            }
            main(args, round_i)`;

export default function Page(): JSX.Element {
  return (
    <>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/tensorboard_scalars.jpg"
        width="800px"
        height="250px"
      />
      <H4>PyTorch Lightning</H4>
      <P>
        I love <Link label="PyTorch" href="https://pytorch.org/" /> for it's
        simplicity and transparency. I like the fact that it is mainly just
        python. Tensors and tensor calculations have to be defined in a
        NumPy-like fashion. But everything else is just python. However,
        sometimes it is nice to avoid some rather engineery boilerplate code and
        focus on the actual experiment. This is where{" "}
        <Link
          label="PyTorch Lightning"
          href="https://www.pytorchlightning.ai/"
        />{" "}
        comes into play.
      </P>

      <Img
        height="600px"
        width="900px"
        src="https://github.com/PyTorchLightning/pytorch-lightning/raw/master/docs/source/_static/images/general/pl_quick_start_full_compressed.gif"
      >
        "Lightning disentangles PyTorch code to decouple the science from the
        engineering"
      </Img>
      <P>
        PyTorch Lightning basically tries to hide all the boilerplate and
        engineering code while so that you can focus on the actual data science.
        Here is a{" "}
        <Link
          label="PyTorch Lightning introduction"
          href="https://pytorch-lightning.readthedocs.io/en/latest/starter/new-project.html"
        />
        . Basically you have to define a <Code>Module</Code> class where the
        actual experiment with data loading, model definition, trainng step,
        validation step, and so on is defined. Then, you initialize a{" "}
        <Code>Trainer</Code> and give it your <Code>Model</Code>, as well as
        training parameters like maximum epochs, early stopping, and so on. This
        way PyTorch Lightning tries to retain you flexibility while removing
        boilerplate code.
      </P>
      <H4>TensorBoard</H4>
      <P>
        Another super useful tool for training neural nets is{" "}
        <Link
          label="TensorBoard"
          href="https://www.tensorflow.org/tensorboard"
        />
        . It's a UI tool that you can deploy to monitor your training runs. With
        it you can track your train/val losses over epochs, custom metrics,
        gradient and activation distributions, and more. It basically looks for
        certain logging files in your directory and visualizes them. So if your
        training runs regularly write these logging files, TensorBoard will
        recognize them. One feature I particularly like is a{" "}
        <Link
          href="https://www.tensorflow.org/tensorboard/hyperparameter_tuning_with_hparams"
          label="HPARAMS"
        />{" "}
        table.
      </P>
      <Img
        src="https://raw.githubusercontent.com/mRcSchwering/vordeck/main/imgs/tensorboard_hparams_table.jpg"
        height="400px"
        width="900px"
      >
        Hyperparameter tuning with TensorBoard{" "}
        <Link
          href="https://www.tensorflow.org/tensorboard/hyperparameter_tuning_with_hparams"
          label="HPARAMS"
        />
      </Img>
      <P>
        If you do hyperparameter optimization you might start 20 training runs
        with different sets of hyperparameters to find out which hyperparmeter
        set performs best. Maybe you use the validation loss for this. So, the
        set of hyperparameters which achieved the lowest validation loss during
        training wins. With a parallel coordinates plots you can then also
        easily see which hyperparameters have a large effect on performance and
        which not.
      </P>
      <H4>PyTorch Lightning and TensorBoard</H4>
      <P>
        Generally, these two work together well. There is a logger class{" "}
        <Link
          label="pl.loggers.TensorBoardLogger"
          href="https://pytorch-lightning.readthedocs.io/en/latest/extensions/generated/pytorch_lightning.loggers.TensorBoardLogger.html#pytorch_lightning.loggers.TensorBoardLogger"
        />{" "}
        which can be used. It is just initialized handed to the <i>Trainer</i>{" "}
        that's it. TensorBoard conform logs will be written during training. The
        whole thing works great except for one thing: the <i>HPARAMS</i> feature
        in TensorBoard. The reason for that is somewhat technical. I
        investigated the whole thing in{" "}
        <Link
          label="this issue"
          href="https://github.com/PyTorchLightning/pytorch-lightning/issues/1228"
        />
        . What follows is just a summary of how you can make it work anyway.
      </P>
      <H4>Custom TensorBoardLogger</H4>
      <P>
        One part of the issue is that before starting, when no training has been
        done yet, the PyTorch Lightning <i>Trainer</i> tells the{" "}
        <i>TensorBoardLogger</i> to do a log. Before the very start when no
        metrics have been recorded yet, this will lead to some hyperparameters
        being deleted. The logging method is <Code>log_hyperparams</Code>. The
        triggering happens somewhere deep in the <i>Trainer</i> orchestration.
        Basically we want to turn the original <Code>log_hyperparams</Code> off
        and place its functionality into a new method, say{" "}
        <Code>log_hyperparams_metrics</Code>. This is the least invasive way of
        switching it off.
      </P>
      <BlockCode code={loggerPy} lang="python" label="logger.py" />
      <H4>TensorBoard logging during Training</H4>
      <P>
        Now we need to tell PyTorch Lightning's <i>Module</i> that it should use
        this new <Code>log_hyperparams_metrics</Code> for logging. These modules
        have different hooks for different stages during training. We want it to
        log <Code>on_train_start</Code>, on <Code>validation_epoch_end</Code>,
        and on <Code>training_epoch_end</Code>. Below is an example how a{" "}
        <i>Base Module</i> could look like. The module remembers the best
        validation loss and updates and logs it after every epoch.
      </P>
      <BlockCode code={mymodulePy} lang="python" label="modules.py" />
      <P>
        The return value of <Code>validation_epoch_end</Code> and{" "}
        <Code>training_epoch_end</Code> is
        <Code>{'{f"{partition}_loss": loss, "log": log}'}</Code>. These keys are
        defaults and other parts of PyTorch Lightning will recognize and use
        them.
        <Code>self.metrics</Code> will be defined on the implemented{" "}
        <i>Modul</i>. These are metrics which are recorded for both training and
        validation. TensorBoard reads log keys such as <Code>metrics/loss</Code>{" "}
        and interprets them. All metrics under <i>metrics/*</i> will go together
        in one tab.
      </P>
      <H4>Implementation</H4>
      <P>
        The <i>Module</i> can then be implemented for the actual experiment.
        This happens like in the{" "}
        <Link
          label="PyTorch Lightning tutorials"
          href="https://pytorch-lightning.readthedocs.io/en/latest/starter/new-project.html"
        />
        . Here is an example.
      </P>
      <BlockCode code={modulePy} lang="python" label="mymodule.py" />
      <P>
        And here is a simple example for the <i>Trainer</i>.<Code>RocAuc</Code>{" "}
        is some example metric. Of course you can feed it any made up metric you
        want to. You just have to make sure the <Code>__call__</Code> signature
        fits.
      </P>
      <BlockCode code={trainerPy} lang="python" label="mytrainer.py" />
      <P>
        Last comment. I tried around with different PyTorch Lightning setups in{" "}
        <Link
          label="this repo"
          href="https://github.com/mRcSchwering/pytorch_lightning_test/"
        />
        . There is also one in combination with{" "}
        <Link label="Optuna" href="https://optuna.org/" /> and one with{" "}
        <Link
          label="RAY[tune]"
          href="https://docs.ray.io/en/latest/tune/index.html"
        />
        .
      </P>
    </>
  );
}
