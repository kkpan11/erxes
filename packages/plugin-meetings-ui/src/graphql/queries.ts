const meetingFields = `
  _id
  title
  description
  startDate
  endDate
  location
  createdBy
  createdAt
  status
  companyId
  participantIds
  dealIds
   createdUser {
     _id
     username
     email
     details {
        fullName
      }
    }
  participantUser{
      _id
      isActive
      email
      details {
        fullName
        firstName
        lastName
        avatar
      }
    }
`;

export const meetingsFilterParamsDef = `
    companyId: $companyId,
    createdAtFrom : $createdAtFrom,
    createdAtTo: $createdAtTo,
    status: $status
    userId: $userId
    isPreviousSession: $isPreviousSession
    participantIds: $participantIds
    dealIds: $dealIds
    perPage: $perPage
    page: $page
`;

export const meetingsFilterParams = `
    $companyId: String,
    $createdAtFrom: String,
    $createdAtTo: String,
    $status: String
    $userId: String
    $isPreviousSession: Boolean
    $participantIds: [String]
    $dealIds: [String]
    $perPage: Int
    $page: Int
`;

const meetings = `
query meetings(${meetingsFilterParams}){
  meetings(${meetingsFilterParamsDef}){
  ${meetingFields}
  }
}`;
const meetingDetail = `
query MeetingDetail($_id: String!) {
  meetingDetail(_id: $_id) {
    _id
    title
    description
    startDate
    endDate
    location
    method
    createdBy
    createdAt
    status
    companyId
    participantUser{
      _id
      details {
        fullName
      }
    }
    createdUser {
        details {
          fullName
        }
      }
    topics{
      _id
      title
      description
      ownerId
    }
  }
}
`;

export default {
  meetings,
  meetingDetail
};
