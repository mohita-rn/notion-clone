'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import {Loader2, Plus} from 'lucide-react'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateNoteDialog = (props: Props) => {
    const router = useRouter();
    const [input, setInput] = React.useState('');

    //useMutation is a react-query hook that allows us to mutate data on the server. 
    const createNotebook = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/createNoteBook', {name: input})
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if (input === '') {
            window.alert('Please enter a name for the notebook')
            return
        }
        createNotebook.mutate(undefined, {
            onSuccess: ({note_id}) => {        
                console.log('created new note', {note_id});   
                router.push(`/notebook/${note_id}`)   
            },
            onError: (error) => {
                console.error('error creating note', error);
                window.alert('Failed to create a new note book')
            }
        
        })
    }
    
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 border-green-600 flex h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className='w-6 h-6 text-green-600' strokeWidth={3} />
                <h2 className='font-semibold ml-2 text-green-600 sm:mt-2'>New Note Book</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    New Note Book
                </DialogTitle>
                <DialogDescription>
                    You can create a new note by clicking the button below.
                </DialogDescription> 
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input placeholder='Name...' value={input} onChange={e => setInput(e.target.value)}/>
                <div className='h-4'></div>
                <div className='flex items-center gap-2'>
                    <Button type='reset' variant={'secondary'}>Cancel</Button>
                    <Button 
                        className='bg-green-600'
                        type='submit'
                        disabled={createNotebook.isLoading}
                    >
                        {createNotebook.isLoading && (
                            <Loader2 className='w-4 h-4 mr-3 animate-spin'/>
                        )}
                        Create
                    </Button>
                </div>
            </form>
        </DialogContent>     
    </Dialog>
  )
}

export default CreateNoteDialog

