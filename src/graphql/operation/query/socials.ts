import { gql } from '@apollo/client'

export const GET_FACEBOOK_DETALS = gql`
  query FindAllFbDetails {
    findAllFbDetails {
      meta {
        currentPage
        lastPage
        next
        perPage
        prev
        total
      }
      data {
        id
        fbId
        about
        name
        username
        website
        overallStarRating
        link
        imageUrl
        fanCount
        followersCount
        engagementMessage
        engagementCount
      }
    }
  }
`
