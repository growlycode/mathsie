import { Controller, FieldPathValue, FieldValues, useFormContext } from 'react-hook-form';
import { listWithItemRemoved } from '../infrastructure/array';

interface NumCheckProps {
    num: number;
    fieldName: string;
}

export const NumCheck = ({ num, fieldName }: NumCheckProps) => {

    const { control } = useFormContext();

    return <Controller
        control={control}
        render={({ field }) => {

            const onChange = (checked: boolean) => {
                const nums: number[] = field.value;
                if (!checked) field.onChange(listWithItemRemoved(num, field.value));
                else field.onChange([...nums, num]);
            }

            return <><input key={`i` + num} checked={field.value?.includes(num)} type="checkbox" value={num} onChange={(e) => onChange(e.currentTarget.checked)} /><span >{num}</span></>;
        }
        } name={fieldName}>


    </Controller>
}