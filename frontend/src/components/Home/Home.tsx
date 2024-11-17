
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { formSchema, FormSchemaT } from './_formSchema';
import { toast } from '@/hooks/use-toast';

export default function Home() {

    const { control, watch, formState, handleSubmit, reset } = useForm<FormSchemaT>({
        resolver: yupResolver<FormSchemaT>(formSchema),
        reValidateMode: "onChange",
        defaultValues: {
            phone: "",
            message: "",
            delay: 1,
            repeat: "0",
        }
    })
    const { errors, isValid, isSubmitting } = formState;

    console.log(watch());
    console.log("Errors", errors)
    async function onFormSubmit(data: FormSchemaT) {
        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const formattedReponse = await response.json();
            await reset();
        } catch (error: any) {
            toast({
                title: "Error!",
                description: error?.message || "Something went wrong!",
                variant: "destructive",
            })
        }
    }
    return (
        <div className='p-4 min-h-screen flex justify-center items-center'>
            <div className='w-max'>
                <Alert>
                    <AlertCircle className='size-4' />
                    <AlertDescription>Your phone number and message is not stored or used after the command is complete.</AlertDescription>
                    <AlertDescription>I am not rich enough to own a database.</AlertDescription>
                </Alert>
                <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col items-center my-4 gap-4 min-w-sm">
                    <Controller
                        control={control}
                        name='phone'
                        rules={{
                            required: true,
                            maxLength: 10
                        }}
                        render={({ field }) => <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="phone">Phone no*</Label>
                                <Input type="text" id="phone" placeholder="Enter Your Phone No." {...field} />
                                {errors?.phone?.message && <div>
                                    <Alert variant={"destructive"}>
                                        <AlertCircle className='size-4' />
                                        <AlertDescription>{errors?.phone?.message}</AlertDescription>
                                    </Alert>
                                </div>}
                            </div>
                        </>}
                    />
                    <Controller
                        control={control}
                        name='message'
                        rules={{
                            required: true,
                            maxLength: 10
                        }}
                        render={({ field }) => <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="message"> Message *</Label>
                                <Input type="text" id="message" placeholder="Enter Your Message" {...field} />
                                {errors?.message?.message && <div>
                                    <Alert variant={"default"}>
                                        <AlertCircle className='size-4' />
                                        <AlertDescription>{errors?.message?.message}</AlertDescription>
                                    </Alert>
                                </div>}
                            </div>
                        </>}
                    />
                    <Controller
                        control={control}
                        name='delay'
                        rules={{
                            required: true,
                            min: 1,
                        }}
                        render={({ field }) => <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="delay">Delay</Label>
                                <Input type="number" id="delay" placeholder="Delay." {...field} />
                                {errors?.delay?.message && <div>
                                    <Alert variant={"default"}>
                                        <AlertCircle className='size-4' />
                                        <AlertDescription>{errors?.delay?.message}</AlertDescription>
                                    </Alert>
                                </div>}
                            </div>
                        </>}
                    />
                    <Controller
                        control={control}
                        name='repeat'
                        render={({ field }) => <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor='repeat'>Repeat</Label>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger id='repeat'>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='0'>Don't Repeat</SelectItem>
                                        <SelectItem value='1'>1 times</SelectItem>
                                        <SelectItem value='10'>10 times</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors?.repeat?.message && <div>
                                    <Alert variant={"default"}>
                                        <AlertCircle className='size-4' />
                                        <AlertDescription>{errors?.repeat?.message}</AlertDescription>
                                    </Alert>
                                </div>}
                            </div>
                        </>}
                    />

                    <Button className='w-full max-w-sm' disabled={!isValid || isSubmitting} type='submit'>
                        {isSubmitting ? "..." : "Submit"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

