import React, { useCallback, useEffect, useState } from 'react'
import s from './ForumThread.module.scss'
import { useParams } from 'react-router-dom'
import { Comment } from 'server/models/forum/comment'
import { Topic } from 'server/models/forum/topic'
import { Reply } from 'server/models/forum/reply'
import { Spinner } from '@/components/Spinner/Spinner'
import { declensionWords } from '@/utils/declensionWords'
import EmojiPicker from '@/components/EmojiPicker/EmojiPicker'
import Error from '@/pages/Error/Error'
import { AppPath } from '@/types/AppPath'
import ForumThreadReplyForm from '@/pages/ForumThread/ForumThreadReplyForm'
import replyIcon from './replyIcon.svg'
import cancelReplyIcon from './cancelReplyIcon.svg'
import { FormattedBodyText } from '@/pages/Forum/Forum'
import { getCurrentDate } from '@/utils/currentDate'
import ForumThreadUserAvatar from '@/pages/ForumThread/ForumThreadUserAvatar'
import { REDIRECT_URI } from '@/utils/HTTPClient'

const ForumThread: React.FC = () => {
  const { topicId } = useParams()

  const location = window.location.pathname

  const [isLoading, setIsLoading] = useState(true)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [replyTo, setReplyTo] = useState({
    user_name: '',
    user_id: 0,
    body: '',
    reply_id: null,
    comment_id: 0,
  })

  const getTopicData = async () => {
    try {
      const responseTopic = await fetch(`${REDIRECT_URI}/api/topics/${topicId}`)
      const jsonTopic = await responseTopic.json()
      setTopic(jsonTopic.topic)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  const getCommentsData = async () => {
    try {
      const responseComments = await fetch(
        `${REDIRECT_URI}/api/comments/${topicId}`
      )
      const jsonComments = await responseComments.json()
      setComments(jsonComments.comments)
      clearDataReplyToState()
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const setDataReplyToState = useCallback(
    (
      user_name: string,
      user_id: number,
      body: string,
      reply_id = null,
      comment_id: number
    ) =>
      setReplyTo({
        ...replyTo,
        user_name,
        user_id,
        body,
        reply_id,
        comment_id,
      }),
    [replyTo]
  )

  const clearDataReplyToState = useCallback(() => {
    setReplyTo({
      ...replyTo,
      user_name: '',
      body: '',
      reply_id: null,
      comment_id: 0,
    })
  }, [replyTo])

  const findReply = (replies: Reply[], id: number) => {
    return replies.find(item => item.id === id)
  }

  useEffect(() => {
    getTopicData().then(() => getCommentsData())
  }, [])

  return (
    <div className="page">
      {isLoading ? (
        <Spinner />
      ) : topic ? (
        <div className="content-wrapper">
          <div className={s.topic}>
            <div className={s.topicCreated}>
              <div>
                <b>Автор топика: </b>
                <ForumThreadUserAvatar userId={topic.user_id} />
                {topic?.user_name}
              </div>
              <div>
                <b>Дата создания: </b>
                <span className={s.date}>
                  {topic && getCurrentDate(topic.created_at)}
                </span>
              </div>
            </div>
            <div className={s.topicTitle}>
              <h1>{topic?.title}</h1>
            </div>
            <div className={s.topicBody}>
              <FormattedBodyText text={topic?.body} />
            </div>
            <EmojiPicker topicId={topicId} />
            <div className={s.commentsCount}>
              <b>
                {comments?.length
                  ? declensionWords(comments?.length, [
                      'комментарий',
                      'комментария',
                      'комментариев',
                    ])
                  : 'Комментариев еще нет'}
              </b>
            </div>
            <div className={s.cards}>
              {comments.map(comment => {
                const {
                  id,
                  body,
                  replies,
                  user_name,
                  user_id,
                  created_at,
                  img_url,
                } = comment

                return (
                  <div className={s.card} key={id}>
                    <div className={s.messageBlock}>
                      <div className={s.replyCreator}>
                        <ForumThreadUserAvatar userId={user_id} />
                        {user_name}
                        <span> оставил(а) комментарий </span>
                        <span>{getCurrentDate(created_at)}</span>
                        <img
                          className={s.commentReplyIcon}
                          onClick={() =>
                            setDataReplyToState(
                              user_name,
                              user_id,
                              body,
                              null,
                              id
                            )
                          }
                          src={replyIcon}
                          alt="Reply Icon"
                          title="Ответить"
                        />
                      </div>
                      <div className={s.messageBlockBody}>
                        {img_url ? (
                          <img className={s.gif} src={img_url} alt="gif" />
                        ) : (
                          <FormattedBodyText text={body} />
                        )}
                      </div>
                      <EmojiPicker commentId={id} />
                      {replies.length ? (
                        <>
                          <b className={s.answersCount}>
                            {declensionWords(replies.length, [
                              'ответ',
                              'ответа',
                              'ответов',
                            ])}
                          </b>
                          <div className={s.replies}>
                            <div className={`${s.cards} ${s.replyCard}`}>
                              {replies.map(reply => {
                                const replyToReply = findReply(
                                  replies,
                                  reply.reply_id
                                )
                                return (
                                  <div
                                    id={`reply-${reply.id}`}
                                    className={s.reply}
                                    key={reply.id}>
                                    <div className={s.replyCreator}>
                                      <ForumThreadUserAvatar
                                        userId={reply.user_id}
                                      />
                                      {reply.user_name}
                                      <span> ответил(а) </span>
                                      <span>
                                        {getCurrentDate(reply.created_at)}
                                      </span>
                                      <img
                                        className={s.replyReplyIcon}
                                        onClick={() =>
                                          setDataReplyToState(
                                            reply.user_name,
                                            reply.user_id,
                                            reply.body,
                                            reply.id,
                                            id
                                          )
                                        }
                                        src={replyIcon}
                                        alt="Reply Icon"
                                        title="Ответить"
                                      />
                                    </div>
                                    {reply.reply_id && (
                                      <a
                                        href={`${location}#reply-${reply.reply_id}`}>
                                        <div className={s.replyTo}>
                                          <div className={s.replyToUser}>
                                            <img
                                              src={replyIcon}
                                              alt="Reply Icon"
                                              title="Ответить"
                                            />
                                            <ForumThreadUserAvatar
                                              userId={replyToReply?.user_id}
                                              width={'15'}
                                            />
                                            <b>{replyToReply?.user_name}</b>
                                          </div>
                                          <div className={s.replyToBody}>
                                            {replyToReply?.body.includes(
                                              'https://media' || '.gif'
                                            ) ? (
                                              <img
                                                className={s.replyGif}
                                                width="50"
                                                src={replyToReply?.body}
                                                alt="GIF"
                                              />
                                            ) : (
                                              replyToReply?.body
                                            )}
                                          </div>
                                        </div>
                                      </a>
                                    )}
                                    <div className={s.replyBody}>
                                      {reply.body.includes(
                                        'https://media' || '.gif'
                                      ) ? (
                                        <img
                                          className={s.gif}
                                          src={reply.body}
                                          alt="gif"
                                        />
                                      ) : (
                                        <FormattedBodyText text={reply.body} />
                                      )}
                                    </div>
                                    <EmojiPicker replyId={reply.id} />
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                )
              })}
              <div className={s.replyFormBlock}>
                {replyTo.body && (
                  <div className={s.replyTo}>
                    <div className={s.replyToUser}>
                      <img src={replyIcon} alt="Reply Icon" title="Ответить" />
                      <ForumThreadUserAvatar
                        userId={replyTo?.user_id}
                        width={'15'}
                      />
                      <b>{replyTo.user_name}</b>
                    </div>
                    <div className={s.replyToBody}>
                      {replyTo.body.includes('https://media' || '.gif')
                        ? 'GIF'
                        : replyTo.body}
                    </div>
                    <img
                      onClick={clearDataReplyToState}
                      src={cancelReplyIcon}
                      alt="Cancel Reply Icon"
                      title="Отменить"
                    />
                  </div>
                )}
                <ForumThreadReplyForm
                  replyId={replyTo.reply_id}
                  commentId={replyTo.comment_id}
                  updateData={getCommentsData}
                  clearReplyState={clearDataReplyToState}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error
          name="🤔"
          text="Упс! Такого топика нет..."
          linkText="Вернуться на страницу форума"
          linkPath={AppPath.FORUM}
        />
      )}
    </div>
  )
}

export default ForumThread
