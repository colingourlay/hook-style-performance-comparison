import React, { useState, useEffect, unstable_Profiler as Profiler } from 'react';
import styled from 'styled-components';
import { css } from 'emotion';
import eStyled from '@emotion/styled';
const { useStyle } = require('hook-style/dist/hook-style.js');

const StyledComponentsContainer = styled.div`
  padding: 1rem;
  background: red;
  border: ${props => (props.border ? '1rem solid yellow' : 'none')};
`;

const StyledComponentsBox = styled.div`
  padding: 1rem;
  background: black;
  color: white;
`;

const EmotionStyledContainer = eStyled.div`
  padding: 1rem;
  background: red;
  border: ${props => (props.border ? '1rem solid yellow' : 'none')};
`;

const EmotionStyledBox = eStyled.div`
  padding: 1rem;
  background: black;
  color: white;
`;

const EmotionContainer = ({ border, children, ...props }) => {
  return (
    <div
      className={css`
        padding: 1rem;
        background: red;
        border: ${border ? '1rem solid yellow' : 'none'};
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
        padding: 1rem;
        background: black;
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
        padding: 1rem;
        background: red;
        border: ${border ? '1rem solid yellow' : 'none'};
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
        padding: 1rem;
        background: black;
        color: white;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const range = Array.from(Array(1000).keys());

const areAnyTruthy = arr => arr.filter(x => x).length > 0;

const log = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  console.group(`${id}:${phase}`);
  console.log(`Actual: ${actualTime}`);
  console.log(`Base:   ${baseTime}`);
  // console.log(`Start time: ${startTime}`);
  // console.log(`Commit time: ${commitTime}`);
  console.groupEnd(`${id}${phase}`);
};

export default function App() {
  const [isStyledComponentsActive, setIsStyledComponentsActive] = useState(false);
  const [isEmotionStyledActive, setIsEmotionStyledActive] = useState(false);
  const [isEmotionActive, setIsEmotionActive] = useState(false);
  const [isHookStyleActive, setIsHookStyleActive] = useState(false);
  const isAnythingActive = areAnyTruthy([
    isStyledComponentsActive,
    isEmotionStyledActive,
    isEmotionActive,
    isHookStyleActive
  ]);

  return (
    <div>
      <div>
        <button
          disabled={isAnythingActive && !isStyledComponentsActive}
          onClick={() => setIsStyledComponentsActive(!isStyledComponentsActive)}
        >
          {isStyledComponentsActive ? 'Remove ' : 'Add '}
          <code>styled-components</code>
        </button>{' '}
        <button
          disabled={isAnythingActive && !isEmotionStyledActive}
          onClick={() => setIsEmotionStyledActive(!isEmotionStyledActive)}
        >
          {isEmotionStyledActive ? 'Remove ' : 'Add '}
          <code>@emotion/styled</code>
        </button>{' '}
        <button disabled={isAnythingActive && !isEmotionActive} onClick={() => setIsEmotionActive(!isEmotionActive)}>
          {isEmotionActive ? 'Remove ' : 'Add '}
          <code>emotion</code>
        </button>{' '}
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
                  <StyledComponentsBox>{index + 1}</StyledComponentsBox>
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
                  <EmotionStyledBox>{index + 1}</EmotionStyledBox>
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
                  <EmotionBox>{index + 1}</EmotionBox>
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
                  <HookStyleBox>{index + 1}</HookStyleBox>
                </HookStyleContainer>
              </HookStyleBox>
            </HookStyleContainer>
          ))}
        </Profiler>
      )}
    </div>
  );
}
