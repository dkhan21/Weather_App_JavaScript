// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import WeatherFavorite from './WeatherFavorite'

export default {  title: 'Components/WeatherFavorite', component: WeatherFavorite }


export const Primary = (args) => <WeatherFavorite {...args} />;
Primary.args = {
  favorites: [
    { id: 1, city: 'New York' },
    { id: 2, city: 'Los Angeles' },
    { id: 3, city: 'London' },
  ],};
