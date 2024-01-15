import Button from './componentes/button'
import StyledTextField from '../src/componentes/styledTextField/StyledTextField';
import { } from '@hookform/resolvers'
import Title from './componentes/title'
import './styles/global.css'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome não pode ser vazio')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ')
    }),
  email: z.string()
    .toLowerCase()
    .email('Formato de email inválido')
    .refine(email => {
      return email.endsWith('@gmail.com')
    }, "O email precisa ser do gmail"),

  password: z.string()
    .min(6, 'A senha precisa de no minimo 6 caracter')
    .max(50)
    .refine(password => {
      let patternRegex1 = /[a-z]/g
      return patternRegex1.test(password)
    }, 'Senha fraca, precisa de pelo menos uma minuscula')
    .refine(password => {
      let patterRegex2 = /[A-Z]/g
      return patterRegex2.test(password)
    }, 'Senha média, precisa de pelo menos uma maiuscula')
    .refine(password => {
      let patterRegex3 = /[0-9]/g
      return patterRegex3.test(password)
    }, 'Senha média, precisa de pelo menos um número')
    .refine(password => {
      let patterRegex4 = /[@$!%*#?&.,;]/g
      return patterRegex4.test(password)
    }, 'Senha forte, precisa de pelo menos um caracter especial'),


  number: z.string()
    .min(11, 'O número precisa ter 11 digitos com o DDD')
    .max(11, 'O número precisa ter 11 digitos com o DDD')
    //61985117330 - (61) 98511-7330
    .transform(number => {
      return number.substr(0, 0).concat('(').concat(number.substr(0, 2)).concat(') ').concat(number.substr(2, 5)).concat('-').concat(number.substr(7))
    }),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function App() {
  const [output, setOutput] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema)
    })

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2))
  }

  return (
    <>
      <div className='main'>
        <div className='form-body'>
          <div className='conteudo'>

            <div className='img'>
              <h1 className='welcome'>Welcome!</h1>
            </div>

            <form
              className='direita'
              onSubmit={handleSubmit(createUser)}>
              <Title />
              <div className='inputs '>
                <StyledTextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  {...register('name')}
                />
                {errors.name && <span className='span'>{errors.name.message}</span>}

                <StyledTextField
                  type='email'
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  {...register('email')}
                />
                {errors.email && <span className='span'>{errors.email.message}</span>}

                <StyledTextField
                  type="password"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  {...register('password')}
                />
                {errors.password && <span className='span'>{errors.password.message}</span>}

                <StyledTextField
                  type="text"
                  id="outlined-basic"
                  label="Number"
                  variant="outlined"
                  placeholder='(DD) XXXXX-XXXX'
                  {...register('number')}
                />
                {errors.number && <span className='span'>{errors.number.message}</span>}
              </div>

              <Button />
              <pre>{output}</pre>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
