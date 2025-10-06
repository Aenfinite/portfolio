"use client"
import { DotGrid } from "@paper-design/shaders-react"
import type React from "react"

type DotGridShaderProps = React.ComponentProps<typeof DotGrid>

export default function DotGridShader(props: DotGridShaderProps) {
  return (
    <DotGrid
      colorFill="#d4d4d4"
      colorStroke="#e5e5e5"
      colorBack="#ffffff"
      size={1.3}
      gapY={10}
      gapX={10}
      strokeWidth={0.5}
      sizeRange={0.1}
      opacityRange={0.5}
      shape="circle"
      {...props}
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        ...(props?.style || {}),
      }}
    />
  )
}
