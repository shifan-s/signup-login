

const CollectionForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter new collection"
        className="w-full sm:w-1/2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition w-full sm:w-auto"
      >
        Submit
      </button>
    </form>
  );
};


export default CollectionForm