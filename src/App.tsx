import React, { useState, useCallback, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import styled, {
  css,
  ThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import Demo from './components/Demo';
enum ColorSchemeMode {
  light,
  dark,
}
const COLOR_THEME = [
  {
    name: 'light',
    color: {
      head: 'black',
      bgPrimary: '#ee9b02',
      textPrimary: '#eeecec',
    },
  },
  {
    name: 'dark',
    color: {
      head: '#16beec',
      bgPrimary: '#aaa',
      textPrimary: '#f7f74b',
    },
  },
];
const GlobalStyle = createGlobalStyle<any>`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root{
    /* 新的属性 */
    color-scheme:${({ theme }) => theme.name || 'normal'};
    /* 定义全局变量 */
    --color-head:${({ theme }) => theme.color.head || 'inherit'};
  }
  h1,h2,h3{
    color:var(--color-head);
  }
`;
const ModeBtn = styled.button`
  /* margin: 15px; */
  padding: 5px;
  & ~ & {
    margin-left: 15px;
  }
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.color.bgPrimary};
  color: ${(props) => props.theme.color.textPrimary};
  font-weight: bold;
  padding: 0.6em 2em;
  border-radius: 0.5em;
  margin: 3em 2em;
  /* box-sizing: border-box; */
  ${(props) =>
    props.theme.name === 'dark' &&
    css`
      border: 6px solid ${props.theme.color.textPrimary};
    `}
`;
function App() {
  const [mode, setMode] = useState<ColorSchemeMode>(ColorSchemeMode.light);
  const systemModeChangeHandler = useCallback((e: any) => {
    if (e.matches) {
      setMode(ColorSchemeMode.dark);
      console.log('切换为dark模式');
    } else {
      setMode(ColorSchemeMode.light);
      console.log('切换为light模式');
    }
  }, []);

  useEffect(() => {
    const isDarkMode = !!window.matchMedia('(prefers-color-scheme: dark)')
      .matches;
    setMode(isDarkMode ? ColorSchemeMode.dark : ColorSchemeMode.light);
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', systemModeChangeHandler);
  }, [systemModeChangeHandler]);

  return (
    <ThemeProvider theme={COLOR_THEME[mode]}>
      <GlobalStyle />
      <div className="App">
        <ModeBtn onClick={() => setMode(ColorSchemeMode.light)}>light</ModeBtn>
        {/* <span>x</span> */}
        <ModeBtn onClick={() => setMode(ColorSchemeMode.dark)}>dark</ModeBtn>
        <Button>hello</Button>
        <h1>h1</h1>
        <h2>h2</h2>
        <h3>h3</h3>
        <Demo />
      </div>
    </ThemeProvider>
  );
}

export default App;
