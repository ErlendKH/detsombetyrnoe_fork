import * as React from "react";
import ForsideProvider from "../../../src/components/forside/ForsideProvider";
import { Typografi } from "../../../src/styles/TypografiNyttDesign";
import SEO from "../../../src/components/SEO";
import { Header } from "../../../src/components/forside/Header";
import CustomComponent from "../../../src/components/CustomComponent";
import Panel from "../../../src/components/Panel";
import { ForsideProps, PanelProps } from "../../../src/pages";
import Nøkkeltall from "../../../src/components/nøkkeltall/Nøkkeltall";
import ArtikkelPreview from "../../../src/components/artikkel/ArtikkelPreview";

function getChildren(innhold?: PanelProps["innhold"]) {
  if (!innhold) {
    return "Mangler innhold";
  }

  switch (innhold._type) {
    case "nokkeltall":
      return <Nøkkeltall {...innhold} />;
    case "placeholder":
      return innhold.tittel;
    case "artikkel":
      return <ArtikkelPreview {...innhold} />;
    default:
      // @ts-ignore
      return `Fant ikke innhold for ${innhold._type} 🤷‍♀️`;
  }
}

function Forside(props: ForsideProps) {
  return (
    <ForsideProvider forsideProps={props}>
      <Typografi />
      <SEO metadata={props.metaData} />
      <Header
        overskrift={props.forside?.overskrift}
        underoverskrift={props.forside?.underoverskrift}
        bakgrunnsfarge={props.forside?.bakgrunnsfarge}
        lysTekst={props.forside?.lysTekst}
      />

      {props.forside?.paneler?.map((panel) =>
        panel._type === "customComponent" ? (
          <CustomComponent {...panel} key={panel.id} />
        ) : (
          <Panel
            key={panel._key}
            backgroundColor={panel.bakgrunnsfarge}
            lysTekst={panel.lysTekst}
            children={getChildren(panel.innhold)}
          />
        )
      )}
    </ForsideProvider>
  );
}

export default Forside;
