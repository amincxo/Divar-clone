import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getCategory } from "services/admin"
import styles from "./Addpost.module.css"

function Addpost() {
    const [form ,setForm] = useState({
        title:"",
        content:"",
        category:"",
        city:"",
        amount:"",
        image:"",
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
        event.preventDefault();
        console.log(form);
        
    }
    
    return (
        <form onChange={changeHandler} className={styles.form}  >
            <h3>افزودن اگهی</h3>
            <label htmlFor="title">عنوان</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" />
            <label htmlFor="amount">قیمت</label>
            <input type="text" name="amount" id="amount" />
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