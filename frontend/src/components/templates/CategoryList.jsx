import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Loader from 'components/modules/Loader';
import React from 'react'

import { deleteCategory, getCategory } from 'services/admin';
import styles from "./CategoryList.module.css"
function CategoryList() {

    const queryClient = useQueryClient();

    const {data , isLoading } = useQuery(["get-category"] , getCategory);

    const response = useMutation( deleteCategory , {
        onSuccess:()=> queryClient.invalidateQueries("get-categories")
    } )

    console.log({data , isLoading})

    const deleteHandler = () => {

    }

  return (
    <div className={styles.list} >
        {isLoading ? <Loader /> : data.data.map(i => (
            <div key={i._id} >
                <img src={`${i.icon}.svg`} alt="" />
                <h5>{i.name}</h5>
                <p>{i.slug} </p>
                {/* {console.log(response)} */}
                <button onClick={()=> response.mutate(i._id)} >حذف</button>
            </div>
        )) }
    </div>
  )
}

export default CategoryList