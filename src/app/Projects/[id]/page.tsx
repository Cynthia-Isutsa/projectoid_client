"use client"

import React from 'react'
import ProjectHeader from '../ProjectHeader'

type Props = {
        params: {
            id: string
        }
}

const Project = ({params}: Props) => {
    const {id} = params
    const [activeTab, setActiveTab] = React.useState("Board")
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false)
  return (
   <div>
    {/* MODAL NEW TASK */}

    {/* <ProjectHeader  activeTab={activeTab} setActiveTab={setActiveTab} /> */}


   </div>
  )
}

export default Project