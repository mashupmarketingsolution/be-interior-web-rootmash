import { PageSections } from "@/components/cms/PageSections";
import BlogHero from '@/components/blogs/bloghero/BlogHero'
import BlogSection from '@/components/blogs/BlogSection/BlogSection'
import React from 'react'

const BlogPage = () => {
  return (
    <div className='mt-25'>
        <PageSections path="/blogs" slots={[{ id: "section-89892e803d65", node: (<BlogHero/>) },
{ id: "section-720af0ba771b", node: (<BlogSection/>) }]} />
    </div>
  )
}

export default BlogPage