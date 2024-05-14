
export function CheckOutButton({ onClick, text,isValid }) {
  
    return (
      <button className="bg-[#61005D] text-white rounded-md py-3 w-full" onClick={onClick}>
      {text}
    </button>
    )
  }