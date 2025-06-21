
// eslint-disable-next-line no-unused-vars
function Input({ icon:Icon , ...props}) {
  return (
   <div className="mb-6 relative">
      {/* Icon positioned inside the input box */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="text-gray-800" />
      </div>
      
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111]"
      />
    </div>
  )
}

export default Input
