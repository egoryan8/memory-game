import axios from 'axios'
import React, { useDeferredValue, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { fetchTrendingGifs } from '@/store/asyncThunks/giphy/fetchTrendingGifs'
import { loadMoreGifs } from '@/store/asyncThunks/giphy/loadMoreGifs'
import { giphySelector } from '@/store/slices/giphySlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import s from './GiphyButton.module.scss'
import { v4 as uuidv4 } from 'uuid'
import { REDIRECT_URI } from '@/utils/HTTPClient'

interface GiphyButtonProps {
  comment: number | null
  reply: number | null
  updateData: () => void
}

const GiphyButton: React.FC<GiphyButtonProps> = ({
  comment,
  reply,
  updateData,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const { items } = useAppSelector(giphySelector)
  const deferredValue = useDeferredValue(searchTerm)
  const refContent = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(fetchTrendingGifs(deferredValue))
    }, 500)

    return () => clearTimeout(timerId)
  }, [deferredValue])

  const loadMore = () => {
    dispatch(loadMoreGifs(searchTerm))
  }

  const { topicId } = useParams()

  const reqPath = !comment && !reply ? 'comments' : 'replies'

  const submitForm = async (event: React.FormEvent, url: string) => {
    event.preventDefault()

    try {
      const resp = await axios.post(`${REDIRECT_URI}/api/${reqPath}/add`, {
        topic_id: topicId,
        comment_id: comment,
        reply_id: reply,
        body: url,
        img_url: url,
      })

      if (resp.status === 200) {
        updateData()
        setIsOpen(false)
      } else {
        console.error('Не удалось создать новый ответ')
      }
    } catch (error) {
      console.error('Ошибка при публикации комментария:', error)
    }
  }

  return (
    <div className={s.giphy}>
      <div className={s.giphyButton} onClick={() => setIsOpen(!isOpen)}>
        GIF
      </div>

      {isOpen && (
        <div ref={refContent}>
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            height={350}
            className={s.content}>
            <form onSubmit={event => event.preventDefault()}>
              <div className={s.inputRoot}>
                <input
                  id="search"
                  className={s.input}
                  type={'text'}
                  value={searchTerm}
                  onChange={event => setSearchTerm(event.target.value)}
                  placeholder="Поиск"
                />
                {searchTerm && (
                  <svg
                    onClick={() => setSearchTerm('')}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8
                           0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10
                           5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
                    />
                  </svg>
                )}
              </div>
            </form>
            <div className={s.images}>
              {items.map(gif => (
                <div
                  key={uuidv4()}
                  className={s.image}
                  onClick={event =>
                    submitForm(event, gif.images.fixed_height.url)
                  }>
                  <img src={gif.images.fixed_height.url} alt="gif" />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  )
}

export default GiphyButton
