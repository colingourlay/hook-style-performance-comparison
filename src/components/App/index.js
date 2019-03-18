import React, { useState, useEffect, unstable_Profiler as Profiler } from 'react';
import styled from 'styled-components';
import { css } from 'emotion';
import eStyled from '@emotion/styled';
const { useStyle } = require('hook-style/dist/hook-style.js');

const StyledComponentsContainer = styled.div`
  background: black;
  border: ${props => (props.border ? '1px solid white' : 'none')};
`;

const StyledComponentsBox = styled.div`
  color: white;
`;

const EmotionStyledContainer = eStyled.div`
  background: black;
  border: ${props => (props.border ? '1px solid white' : 'none')};
`;

const EmotionStyledBox = eStyled.div`
  color: white;
`;

const EmotionContainer = ({ border, children, ...props }) => {
  return (
    <div
      className={css`
        background: black;
        border: ${border ? '1px solid white' : 'none'};
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const EmotionBox = ({ children, ...props }) => {
  return (
    <div
      className={css`
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const HookStyleContainer = ({ border, children, ...props }) => {
  return (
    <div
      className={useStyle`
        background: black;
        border: ${border ? '1px solid white' : 'none'};
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const HookStyleBox = ({ children, ...props }) => {
  return (
    <div
      className={useStyle`
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const range = Array.from(Array(1000).keys());

const log = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  console.group(`${id}:${phase}`);
  console.log(`Actual: ${actualTime}`);
  console.log(`Base:   ${baseTime}`);
  console.groupEnd(`${id}${phase}`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
};

export default function App() {
  const [isStyledComponentsActive, setIsStyledComponentsActive] = useState(false);
  const [isEmotionStyledActive, setIsEmotionStyledActive] = useState(false);
  const [isEmotionActive, setIsEmotionActive] = useState(false);
  const [isHookStyleActive, setIsHookStyleActive] = useState(false);
  const isAnythingActive = [isStyledComponentsActive, isEmotionStyledActive, isEmotionActive, isHookStyleActive].filter(
    x => x
  ).length;

  return (
    // <Profiler id="app" onRender={log}>
    <div>
      <div>
        <button
          disabled={isAnythingActive && !isStyledComponentsActive}
          onClick={() => setIsStyledComponentsActive(!isStyledComponentsActive)}
        >
          {isStyledComponentsActive ? 'Remove ' : 'Add '}
          <code>styled-components</code>
        </button>
        {' · '}
        <button
          disabled={isAnythingActive && !isEmotionStyledActive}
          onClick={() => setIsEmotionStyledActive(!isEmotionStyledActive)}
        >
          {isEmotionStyledActive ? 'Remove ' : 'Add '}
          <code>@emotion/styled</code>
        </button>
        {' · '}
        <button disabled={isAnythingActive && !isEmotionActive} onClick={() => setIsEmotionActive(!isEmotionActive)}>
          {isEmotionActive ? 'Remove ' : 'Add '}
          <code>emotion</code>
        </button>
        {' · '}
        <button
          disabled={isAnythingActive && !isHookStyleActive}
          onClick={() => setIsHookStyleActive(!isHookStyleActive)}
        >
          {isHookStyleActive ? 'Remove ' : 'Add '}
          <code>hook-style</code>
        </button>
      </div>
      {isStyledComponentsActive && (
        <Profiler id="styled-components" onRender={log}>
          {range.map(index => (
            <StyledComponentsContainer key={index}>
              <StyledComponentsBox>
                <StyledComponentsContainer border>
                  <StyledComponentsBox>Box2 {index + 1}</StyledComponentsBox>
                </StyledComponentsContainer>
              </StyledComponentsBox>
            </StyledComponentsContainer>
          ))}
        </Profiler>
      )}
      {isEmotionStyledActive && (
        <Profiler id="@emotion/styled" onRender={log}>
          {range.map(index => (
            <EmotionStyledContainer key={index}>
              <EmotionStyledBox>
                <EmotionStyledContainer border>
                  <EmotionStyledBox>Box2 {index + 1}</EmotionStyledBox>
                </EmotionStyledContainer>
              </EmotionStyledBox>
            </EmotionStyledContainer>
          ))}
        </Profiler>
      )}
      {isEmotionActive && (
        <Profiler id="emotion" onRender={log}>
          {range.map(index => (
            <EmotionContainer key={index}>
              <EmotionBox>
                <EmotionContainer border>
                  <EmotionBox>Box2 {index + 1}</EmotionBox>
                </EmotionContainer>
              </EmotionBox>
            </EmotionContainer>
          ))}
        </Profiler>
      )}
      {isHookStyleActive && (
        <Profiler id="hook-style" onRender={log}>
          {range.map(index => (
            <HookStyleContainer key={index}>
              <HookStyleBox>
                <HookStyleContainer border>
                  <HookStyleBox>Box2 {index + 1}</HookStyleBox>
                </HookStyleContainer>
              </HookStyleBox>
            </HookStyleContainer>
          ))}
        </Profiler>
      )}
    </div>
    // </Profiler>
  );
}
