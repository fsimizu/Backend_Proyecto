export const generateUserErrorInfo = ({firstName, lastName, email}) => {
    return `
      Una o mas propiedades estan incompletas o invalidas!!!
      Lista de propiedades obligatgorias:
          * first_name: Must be a string. (${firstName})
          * last_name: Must be a string. (${lastName})
          * email: Must be a string. (${email})    
      `;
  };