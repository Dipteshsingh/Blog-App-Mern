import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart3, Eye, MessageSquare, ThumbsUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const TotalProperty = () => {
  const {blog} = useSelector(store=>store.blog)
  const [totalComments, setTotalComments] = useState(0)
    const [totalLikes, setTotalLikes] = useState(0)
    const dispatch = useDispatch()
    const getAllBlogs = async () =>{
      try {
        const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/blogs/my_blogs`,{withCredentials:true})
        if (res.data.success) {
           dispatch(setBlog(res.data.totalComments))
        }
      } catch (error) {
         console.log(error);
      }
    }
    const getTotalComments = async()=>{
        try {
           const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/comment/all-comment`, { withCredentials: true })
          if(res.data.success){
             setTotalComments(res.data.totalComments)
          }
        } catch (error) {
          console.log(error);
          
        }
    }

    const getTotalLikes = async()=>{
      try {
        const res = await axios.get(`https://blog-app-mern-8.onrender.com/api/my-blogs/likes`,{withCredentials:true})
        if(res.data.success){
           setTotalLikes(res.data.totalLikes)
        }
      } catch (error) {
       console.log(error);
        
      }
    }
    useEffect(()=>{
        getAllBlogs()
        getTotalComments()
        getTotalLikes()
    },[])
    const stats = [
        {
          title: "Total Views",
          value: "24.8K",
          icon: Eye,
          change: "+12%",
          trend: "up",
        },
        {
          title: "Total Blogs",
          value: blog.length,
          icon: BarChart3,
          change: "+4%",
          trend: "up",
        },
        {
          title: "Comments",
          value: totalComments,
          icon: MessageSquare,
          change: "+18%",
          trend: "up",
        },
        {
          title: "Likes",
          value: totalLikes,
          icon: ThumbsUp,
          change: "+7%",
          trend: "up",
        },
      ]
  return (
     <div className='md:p-10 p-4'>
       <div className='flex flex-col md:flex-row justify-around gap-3 md:gap-7'>
       
      {stats.map((stat) => (
        <Card key={stat.title} className="w-full dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    
       </div>
    </div>
  )
}

export default TotalProperty
