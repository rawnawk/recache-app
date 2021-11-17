//https://github.com/react-native-datetimepicker/datetimepicker


import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App(){
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
        
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
    </View>
  );
};