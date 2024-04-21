
const Button = ({onClick,text}:{onClick:()=>void,text:string}) => {
  return <button
  type="submit"
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-48"
  onClick={onClick}
>
  {text}
</button>
}

export default Button
