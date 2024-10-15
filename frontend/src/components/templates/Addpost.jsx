import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getCategory } from "services/admin"
import styles from "./Addpost.module.css"
import { getCookie } from "utils/cookie"
import axios from "axios"
import toast from "react-hot-toast"

function Addpost() {
    const [form ,setForm] = useState({
        title:"",
        content:"",
        category:"",
        city:"",
        amount: null,
        image:null,
    })
    const { data , isFetching } = useQuery(["get-categories"] , getCategory)
    
    const changeHandler = (event) => {
        const name = event.target.name
        if (name !== "images") {
            setForm({...form , [name]: event.target.value})
        } else {
            setForm({...form , [name]: event.target.files[0]})
        }
    }

    const addHandler = () => {
        const formData = new FormData();
        event.preventDefault();
        for(let i in form) {
            formData.append(i , form[i]);
        }
        const token = getCookie ("accessToken");

        axios.post(`${import.meta.env.VITE_BASE_URL}post/create` , formData , {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
            }
        }).then(res => toast.success(res.data.message))
        .catch(error => toast.error("مشککلی پیش امده کسگم"));
        
        
    }
    
    return (
        <form onChange={changeHandler} className={styles.form}  >
            <h3>افزودن اگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
            <label htmlFor="amount">قیمت</label>
            <input type="number" name="amount" id="amount" />
            <label htmlFor="city">شهر</label>
            <input type="text" name="city" id="city" />
            <label htmlFor="category">دسته بندی</label>
            <select name="category"  id="category">
            {isFetching ? 
             <option>در حال بارگزاری</option>
            :(
                data?.data.map((i)=>
                    <option key={i._id} value={i._id} >
                        {i.name}
                    </option> 
            ))}
            </select>
            <label htmlFor="image">عکس</label>
            <input type="file" name="image" id="image" />
            <button onClick={addHandler} >ایجاد</button>
            
        </form>
  )
}

export default Addpost