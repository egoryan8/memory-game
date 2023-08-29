import React, { FC, PropsWithChildren } from 'react'
import style from './Table.module.scss'

export const Table: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.table}>{children}</div>
}

export const TableRow: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.table__row}>{children}</div>
}

export const TableHeaderCell: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.table__header}>{children}</div>
}

export const TableCell: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.table__cell}>{children}</div>
}

export const TableBody: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.table__body}>{children}</div>
}
