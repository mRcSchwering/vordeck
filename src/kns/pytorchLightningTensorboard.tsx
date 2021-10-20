import { P, H4, Link, Code, BlockCode, Img } from "./components";

/**
 * pytorch with pytorch lightning intoduction
 * Tensorboard, show that tensorboard feature
 * Problem statement
 * Solution with code
 *
 */

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


class MyModule(pl.LightningModule):
    def __init__(self):
        super().__init__()
        self.best_val_loss = 999.9
        self.prev_epoch_times = {"val": None, "train": None}

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

        log = {
            f"metrics/{partition}_loss": loss,
            f"stats/{partition}_epoch_s": self._update_epoch_time(partition),
        }
        if partition == "val":
            log["metrics/best_val_loss"] = self._update_best_loss(loss)
        for name, metric in self.metrics.items():
            log[f"metrics/{partition}_{name}"] = metric(targets, predictions)

        return {f"{partition}_loss": loss, "log": log}

    def _update_best_loss(self, loss: float):
        if loss < self.best_val_loss:
            self.best_val_loss = loss
        return self.best_val_loss

    def _update_epoch_time(self, partition: str):
        now = time.time()
        if self.prev_epoch_times[partition] is None:
            self.prev_epoch_times[partition] = now
        self.prev_epoch_times[partition] = now - self.prev_epoch_times[partition]
        return self.prev_epoch_times[partition]`;

const modulePy = `from torch.utils.data import DataLoader
import torch.nn.functional as F
import torch.optim as optim
from modules import MyModule
from dataloading import MyData
from modeling import MyModel

N_CPUS = 8


class MyExperiment(MyModule):
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
import pytorch_lightning as pl
from pytorch_lightning import Trainer
from metrics import RocAuc
from loggers import MyTensorBoardLogger
from e5_using_logkey.module import MyModule

THIS_DIR = Path(__file__).parent.absolute()


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
      <Link label="TensorBoard" href="https://www.tensorflow.org/tensorboard" />
      <Link
        label="pl.loggers.TensorBoardLogger"
        href="https://pytorch-lightning.readthedocs.io/en/latest/extensions/generated/pytorch_lightning.loggers.TensorBoardLogger.html#pytorch_lightning.loggers.TensorBoardLogger"
      />
      <Link
        label="PyTorch Lightning introduction"
        href="https://pytorch-lightning.readthedocs.io/en/latest/starter/new-project.html"
      />
      <Img
        src="https://www.tensorflow.org/tensorboard/images/hparams_table.png?raw=1"
        height="700px"
        width="800px"
      >
        Hyperparameter tuning with TensorBoard{" "}
        <Link
          href="https://www.tensorflow.org/tensorboard/hyperparameter_tuning_with_hparams"
          label="HPARAMS"
        />
      </Img>
      <BlockCode code={loggerPy} lang="python" />
      <BlockCode code={mymodulePy} lang="python" />
      <BlockCode code={modulePy} lang="python" />
      <BlockCode code={trainerPy} lang="python" />
    </>
  );
}
