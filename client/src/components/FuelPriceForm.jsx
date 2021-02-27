import React, {useState} from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import '../styles/styles.css'


const FuelPriceForm = () => {

  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <form className='form'>
      <div>
        <label>Number of Gallons Requested? (required)</label>
        <input type='number' placeholder='Enter Number of Gallons.'></input>
        
      </div>
      
      <div>
        <label>Delivery Address</label>
        <input type="text" placeholder='Address comes from profile.' />
      </div>
      
     
      
        <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholderText="Select Delivery Date"
        />
     
     <div>
       <label>Suggested Price=</label>
      </div>
     <div>
       <label>Total Amount= </label>
      </div>

      <input type='submit' value='Get Price' />
    </form>
    

  )
}

export default FuelPriceForm
