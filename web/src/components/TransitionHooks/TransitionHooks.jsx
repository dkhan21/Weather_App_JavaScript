import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TransitionContext,
  useTransitionStateManager,
  useTransitionTrigger,
} from '@mui/base/useTransition';
import { styled } from '@mui/system';

const blue = {
  200: 'black',
  300: 'black',
  400: 'black',
  500: 'black',
  600: 'black',
  700: 'black',
};

const ToggleButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.990rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px ;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  display: block;
  width: 500px;

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
`,
);

const Content = styled('div')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.990rem;
  line-height: 1.5;
  padding: 8px 16px;
`;

const Root = styled('div')`
  max-width: 500px;
`;

function Trivia(props) {
  const { label, children } = props;
  const [open, setOpen] = React.useState(false);
  const { contextValue } = useTransitionTrigger(open);
  const containerId = React.useId();

  return (
    <Root>
      <ToggleButton
        type="button"
        aria-controls={containerId}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </ToggleButton>
      <TransitionContext.Provider value={contextValue}>
        <Content id={containerId} aria-hidden={!open}>
          {children}
        </Content>
      </TransitionContext.Provider>
    </Root>
  );
}

Trivia.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

const SlideDownOuterWrapper = styled('div')`
  display: grid;
  transition: grid-template-rows 200ms ease-in-out;
  grid-template-rows: 0fr;

  &.expanded {
    grid-template-rows: 1fr;
  }
`;

const SlideDownInnerWrapper = styled('div')`
  overflow: hidden;
`;

function SlideDown(props) {
  const { children } = props;
  const { requestedEnter, onExited } = useTransitionStateManager();

  return (
    <SlideDownOuterWrapper
      className={requestedEnter ? 'expanded' : ''}
      onTransitionEnd={(event) => {
        if (event.propertyName === 'grid-template-rows') {
          if (!requestedEnter) {
            onExited();
          }
        }
      }}
    >
      <SlideDownInnerWrapper>{children}</SlideDownInnerWrapper>
    </SlideDownOuterWrapper>
  );
}

SlideDown.propTypes = {
  children: PropTypes.node,
};

export { Trivia, SlideDown };
