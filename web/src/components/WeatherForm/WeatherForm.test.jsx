import { render , fireEvent} from '@redwoodjs/testing/web'

import WeatherForm from './WeatherForm'
import '@testing-library/jest-dom/extend-expect';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

//We will have multple it statements that will check for each UI component

describe('WeatherForm', () => {
  //This renders the page successfully
  it('Renders component successfully', () => {
    expect(() => {
      render(<WeatherForm />)
    }).not.toThrow()
  })

  //This test if the date is changed when the user  changes it
  it('Render Date Change', () => {

    const { getByLabelText}  = render(<WeatherForm/>)

    const date = getByLabelText(/Select a date/i);

    //This is the current date
    const currentDate = new Date().toISOString().split('T')[0];

    //Initializing the date change
    fireEvent.change(dateInput, { target: { value: '2023-07-02' } });

    expect(date.value).not.toBe(currentDate);

  })

  it('Render Weather Forecast Display', () => {
    render(<WeatherForm />)

  })

})
