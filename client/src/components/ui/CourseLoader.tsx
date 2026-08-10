import React from 'react'

export default function CourseLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-(--border) rounded-sm p-4 animate-pulse">
                    <div className="aspect-video bg-(--border)/50 rounded-sm mb-4"></div>
                    <div className="h-5 bg-(--border)/50 rounded-sm w-3/4 mb-2"></div>
                    <div className="h-4 bg-(--border)/50 rounded-sm w-1/2 mb-2"></div>
                    <div className="h-4 bg-(--border)/50 rounded-sm w-2/3"></div>
                </div>
            ))}
        </div>
    )
}
