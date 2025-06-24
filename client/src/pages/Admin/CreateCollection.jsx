import  { useState, useEffect } from 'react';
import AdminMenu from '../../components/AdminMenu';
import {toast} from 'sonner'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CollectionForm from '../../components/form/CollectionForm';
import { Modal } from 'antd';


const CreateCollection = () => {
const [collection,setcollection]= useState([])
const [name,setName] = useState("")
const [isModalOpen, setIsModalOpen] = useState(false);
const [selected,setSelected] = useState(null);
const [updatedName,setUpdatedName] = useState("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


// console.log(collection);

//  handle form for create collection

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
const {data}= await axios.post("http://localhost:8080/api/v1/collection/create-collection",{name})

if(data && data.success){
  toast.success(data.message)
  getAllCollection()
  setName("")
}
else{
  toast.error(data.message)
}
}catch(error){
console.log(`Error in creating collection ${error}`);
toast.error(`something went wrong while creating collection ${error}`)

    }
  }


// fetch all collection from backend

const getAllCollection = async()=>{
try{
const {data} = await axios.get("http://localhost:8080/api/v1/collection/get-allcollection")
if(data.success){
  setcollection(data.collection)
  toast.success("Collections fetched successfully!")
}
  }catch(error){
    console.log(error);
    toast.error(`something went wrong getting all collection ${error}`)
    
  }
}


// delete collection


const deleteCollection = async (id) =>{
  try{
const {data} = await axios.delete(`http://localhost:8080/api/v1/collection/delete-collection/${id}`)
if (data && data.success) {
  toast.success(data.message)
  getAllCollection()
}
else{
  toast.error(data.message)
}


  }catch(error){
    console.log(error);
    toast.error(`Error in delete collection ${error}`)
  }
}

useEffect(()=>{
getAllCollection()
},[])

// update collection
//  handle update

const handleUpdate = async(e)=>{
   e.preventDefault()
  try{
const {data} = await axios.put(`http://localhost:8080/api/v1/collection/update-collection/${selected._id}`,{name:updatedName})
if (data&& data.success) {
  setSelected(null)
  setUpdatedName("")
  handleCancel()
  getAllCollection()
 toast.success(data.message)

}else{
  toast.error(data.message)
}

  }catch(error){
    console.log(error);
    toast.error(`Error in Update collection ${error}`)
    
  }
}



  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
  <aside className="w-full md:w-1/5 border-b md:border-b-0 md:border-r border-gray-800 p-4 md:p-6 bg-black">
    <AdminMenu />
  </aside>

  <main className="w-full md:w-4/5 p-6 md:p-10">
    <h1 className="text-xl text-cyan-400 font-semibold mb-8">Manage Collection</h1>

    <CollectionForm handleSubmit={handleSubmit} value={name} setValue={setName} />

    <div className="bg-gray-800 rounded-xl shadow-lg overflow-x-auto mt-8">
      <table className="w-full text-left min-w-[400px]">
        <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="px-6 py-4 uppercase text-sm tracking-wide">Name</th>
            <th className="px-6 py-4 uppercase text-sm tracking-wide">Action</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((item, index) => (
            <tr key={index} className="border-t border-gray-700 hover:bg-gray-700/40">
              <td className="px-6 py-4 text-gray-200">{item.name}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4 text-gray-400">
                  <EditIcon onClick={()=>{showModal(); setUpdatedName(item.name);setSelected(item)}} className="cursor-pointer hover:text-blue-400 transition duration-200" />
                  <DeleteIcon onClick={()=>{deleteCollection(item._id)}} className="cursor-pointer hover:text-red-500 transition duration-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       <Modal
        title="Update collection"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // footer={null}
      >
        <CollectionForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName}/>
      </Modal>
  </main>
</div>

  );
};

export default CreateCollection;


