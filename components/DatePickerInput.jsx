import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const DynamicDatePicker = ({ data , preData,id}) => {
  return (
    < >
      {data?.map((elem, index) => (
        // <div className='w-full date-picker'>
          <LocalizationProvider key={index} dateAdapter={AdapterDayjs} className="w-full bg-white ">
          <DemoContainer components={['DatePicker']} >
          <div id={elem.id}>
            <DatePicker label={elem.label}   defaultValue={dayjs(elem.preData)} 
            />
            </div>
          </DemoContainer>
        </LocalizationProvider>
        // </div> 
      ))}
      </>
  );
};

export default DynamicDatePicker;
