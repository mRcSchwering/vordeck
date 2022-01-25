import React from "react";
import { Heading, Paragraph, Box, Anchor } from "grommet";
import { AppHeader, Section, AppFooter } from "../components";

function H6(props: { text: string }): JSX.Element {
  return (
    <>
      <br />
      <b>{props.text}</b>
      <br />
      <br />
    </>
  );
}

export default function LegalNoticePage(): JSX.Element {
  return (
    <Box>
      <AppHeader />
      <Section>
        <Heading level="2">Impressum</Heading>
        <Paragraph>
          <H6 text="Kontakt" />
          E-Mail: info@vordeck.de
          <br />
          LinkedIn: marc-schwering-139914103
          <br />
          Twitter: schweringMarc
          <br />
          <H6 text="Umsatzsteuer-ID" />
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          DE348811421 <br />
          <H6 text="Verbraucherstreitbeilegung/Universalschlichtungsstelle" />
          Wir sind nicht bereit oder verpflichtet, an Streitbeile-
          gungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          <br />
          <Anchor
            href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE"
            label="Online -Streitbeilegungsplattform"
          />
          <br />
          <H6 text="Haftung für Inhalte" />
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
          auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
          §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen.
          <br />
          <br />
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.
          <br />
          <H6 text="Haftung für Links" />
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
          <br />
          <br />
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
          ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
          <br />
          <H6 text="Urheberrecht" />
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          <br />
          <br />
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.
          <br />
        </Paragraph>
      </Section>
      <AppFooter />
    </Box>
  );
}
