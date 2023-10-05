import LeaderBoardApi from '@/api/LeaderBoardApi'
import { AppThunk } from '@/store'
import { setLeadersError } from '@/store/features/leaderBoardSlice'

const setLeaderBoardResult =
  (formData: ILeaderBoardData): AppThunk =>
  async dispatch => {
    try {
      const response = await LeaderBoardApi.setLeaderBoardResult({
        data: { ...formData },
        ratingFieldName: 'codeHuntersMemoryGameScore',
      })

      if (response.status !== 200) {
        const text = await response.text()

        dispatch(setLeadersError(`FETCH_LEADERS_RESULT_FAILED: ${text}`))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default setLeaderBoardResult
