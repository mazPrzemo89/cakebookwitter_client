interface errorMsgsObj {
  idError: {
    noId: string
    negativeId: string
  }
  nameError: {
    noName: string
    maxSize: string
  }
  commentError: {
    noComment: string
    maxSize: string
  }
  photoError: string
}

const errMsgs: errorMsgsObj = {
  idError: {
    noId: 'Please provide an id.',
    negativeId: 'Id cannot be a negative number.',
  },
  nameError: {
    noName: 'Please provide a name for your cake.',
    maxSize: 'Name cannot be longer than 20 characters.',
  },
  commentError: {
    noComment: 'Please write a comment.',
    maxSize: 'Comment cannot be longer than 200 characters.',
  },
  photoError: 'Please choode an image file.',
}

export const validator = (
  name: string,
  value: string | number,
): any | boolean => {
  if (name === 'id') {
    if (!value || value === '') {
      return { idErr: errMsgs.idError.noId }
    } else if (value < 0) {
      return { idErr: errMsgs.idError.negativeId }
    } else return false
  }
  if (name === 'name') {
    if (value === '') {
      return { nameErr: errMsgs.nameError.noName }
    } else if ((value as string).length > 20) {
      return { nameErr: errMsgs.nameError.maxSize }
    } else return false
  }
  if (name === 'comment') {
    if (value === '') {
      return { commentErr: errMsgs.commentError.noComment }
    } else if ((value as string).length > 200) {
      return { comentErr: errMsgs.commentError.maxSize }
    } else return false
  }
  if (name === 'photo') {
    if (!value) {
      return { photoErr: errMsgs.photoError }
    } else return false
  }
  return false
}
