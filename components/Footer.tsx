import React from 'react'

import { footerList1, footerList2, footerList3 } from '../utils/constants'

const List = ({ items, mt }: { items: string[]; mt: boolean }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
      {items.map((item) => (
        <p
          key={item}
          className="text-muted-light text-xs hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  )
}

const Footer = () => {
  return (
    <div className="mt-6 hidden lg:block">
      <List items={footerList1} mt={false} />
      <List items={footerList3} mt />
      <p></p>
    </div>
  )
}

export default Footer
