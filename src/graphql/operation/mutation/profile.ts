import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql `
    mutation UpdateProfile($updateProfileId: String!, $payload: UpdateProfileInput!) {
        updateProfile(id: $updateProfileId, payload: $payload) {
            message
        }
    }
`