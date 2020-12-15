import React, { useState, useContext, createContext } from "react";
import {
  Container,
  Inner,
  Title,
  Frame,
  Item,
  Header,
  Body,
} from "./styles/accordion.elements";
const ToggleContext = createContext();

export default function Accordion({ children, ...resetProps }) {
  return (
    <Container {...resetProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...resetProps }) {
  return <Title {...resetProps}>{children} </Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...resetProps }) {
  return <Frame {...resetProps}>{children} </Frame>;
};

Accordion.Item = function AccordionItem({ children, ...resetProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...resetProps}>{children} </Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...resetProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <Header onClick={() => setToggleShow((toggleShow) => !toggleShow)}>
      {children}
      {toggleShow ? (
        <img src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  /* return toggleShow ? <Body {...restProps}>{children}</Body> : null; */

  return (
    <Body className={toggleShow ? "open" : "closed"} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};
