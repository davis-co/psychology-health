import React from "react"
import { Cell, Pie, PieChart } from "recharts"

const SmallChart = ({ generalData, userData, valuesLength }) => {
  const totalAngle = 180

  const calculateAngles = () => {
    let currentAngle = 0
    return generalData.map(({ value, color }) => {
      const angle = ((value.max - value.min) / 100) * totalAngle
      const entry = {
        value: angle,
        color,
      }
      currentAngle += angle

      return entry
    })
  }

  const calculateUserAngles = () => {
    const userValue = userData.value

    return generalData.map(({ value, color }) => {
      const angle = ((value.max - value.min) / 100) * totalAngle
      let currentAngle = 0

      if (userValue >= value.min && userValue <= value.max) {
        currentAngle =
          ((userValue - value.min) / (value.max - value.min)) * angle
      }

      const entry = {
        value: currentAngle >= 0 ? currentAngle : 0.01,
        color,
      }

      return entry
    })
  }

  const userValue = userData.value
  const userAngle = (userValue / valuesLength) * totalAngle

  const userDataSections = calculateUserAngles()

  const generalDataSections = calculateAngles()

  return (
    <PieChart width={150} height={90}>
      {/* General BMI Sections */}
      <Pie
        data={generalDataSections}
        dataKey="value"
        cx="50%"
        cy="100%"
        outerRadius={64}
        innerRadius={60}
        animationDuration={2000}
        startAngle={totalAngle}
        endAngle={0}
        paddingAngle={4}
        fill="#8884d8"
      >
        {generalDataSections.map((section, index) => (
          <Cell key={`cell-${index}`} fill={section.color} />
        ))}
      </Pie>

      {/* User BMI Section */}
      <Pie
        data={userDataSections}
        dataKey="value"
        cx="50%"
        cy="100%"
        outerRadius={60}
        innerRadius={40}
        startAngle={180}
        endAngle={totalAngle - userAngle}
        animationDuration={2000}
        fill="#8884d8"
      >
        {userDataSections.map((section, index) => (
          <Cell key={`cell-${index}`} fill={section.color} />
        ))}
      </Pie>
      <text
        x="50%"
        y="90%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={25}
      >
        {userValue.toFixed(2)}
      </text>
    </PieChart>
  )
}

export default SmallChart
