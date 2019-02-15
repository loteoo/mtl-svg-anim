import {h, app} from 'hyperapp'

import './global.css'

// Mouse subscription
export const Mouse = {
  move: (props) => ({
    effect: (props, dispatch) => {
      const handler = ev => dispatch(props.action, ev)
      window.addEventListener("mousemove", handler)
      return () => window.removeEventListener("mousemove", handler)
    },
    action: props.action
  })
};

// Process mouse movements to the state
const HandleMouseMove = (state, ev) => ({
  ...state,
  strokeDashOffset: 1500 - ((ev.clientX / window.innerWidth) * 1500),
  fillOpacity: ev.clientY / window.innerHeight
})

// Invert theme colors
const InvertColors = (state, ev) => ({
  ...state,
  inverted: !state.inverted
})

// Initialize the app
app({
  init: {
    inverted: false,
    strokeWidth: 6,
    strokeDashArray: 1500,
    strokeDashOffset: 1500,
    fillOpacity: 100
  },
  view: (state) => (
    <main class="app" onclick={InvertColors} inverted={state.inverted}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          stroke-width={state.strokeWidth}
          stroke-dasharray={state.strokeDashArray}
          stroke-dashoffset={state.strokeDashOffset}
          fill-opacity={state.fillOpacity}
          d="M409.53,240a64.92,64.92,0,0,0-52-117.56A64.94,64.94,0,0,0,240,70.47a64.92,64.92,0,0,0-117.56,52A64.94,64.94,0,0,0,70.47,240a64.92,64.92,0,0,0,52,117.56,64.94,64.94,0,0,0,117.56,52,64.92,64.92,0,0,0,117.56-52,64.94,64.94,0,0,0,52-117.56ZM250,151.84V105a45,45,0,1,1,70.54,37,29.81,29.81,0,0,0-40.36,26.23c0,.6-.18,1.16-.18,1.76a30,30,0,0,0,30,30c.6,0,1.17-.14,1.76-.18A29.67,29.67,0,0,0,338,159.46,45,45,0,1,1,375,230H270a20,20,0,0,1-20-20ZM60,185a45,45,0,0,1,82-25.54,29.81,29.81,0,0,0,26.23,40.36c.59,0,1.16.18,1.76.18a30,30,0,0,0,30-30c0-.6-.14-1.17-.18-1.76A29.67,29.67,0,0,0,159.46,142,45,45,0,1,1,230,105V210a20,20,0,0,1-20,20H105A45,45,0,0,1,60,185ZM230,328.16V375a45,45,0,1,1-70.54-37,29.81,29.81,0,0,0,40.36-26.23c0-.6.18-1.16.18-1.76a30,30,0,0,0-30-30c-.6,0-1.17.14-1.76.18A29.67,29.67,0,0,0,142,320.54,45,45,0,1,1,105,250H210a20,20,0,0,1,20,20ZM375,340a44.91,44.91,0,0,1-37-19.46,29.81,29.81,0,0,0-26.23-40.36c-.59,0-1.16-.18-1.76-.18a30,30,0,0,0-30,30c0,.6.14,1.17.18,1.76A29.67,29.67,0,0,0,320.54,338,45,45,0,1,1,250,375V270a20,20,0,0,1,20-20H375a45,45,0,0,1,0,90Z"
        />
      </svg>
      <pre class="state">{JSON.stringify(state, null, 2)}</pre>
    </main>
  ),
  subscriptions: (state) => [
    <Mouse.move action={HandleMouseMove} />
  ],
  container: document.body
})
