import { email } from "../../types/email";
import { participant as ParticipantType } from "../../types/participant";

function ConstructBulkInitialEmails(participants: ParticipantType[]): email[]{
    const emails: email[] = [];
    for (const participant of participants) {
        let extenstion = "";
        if(participant.firstPreference === "c-prog"){
          extenstion = `<p>The C/Embedded C workshop will start at the beginning of July.</p>`
        }else if(participant.firstPreference === "fullstack"){
          extenstion = `<p>The Full-stack workshop will start at the beginning of July.</p>`
        }else{
          extenstion = `<p>The ${participant.firstPreference} workshop will start at the beginning of August.</p>`
        }
        const emailBody: string =`<html><p>Dear Applicant,</p><div style='width:50%'><p>We would like to extend our appreciation for your interest in applying to Semicolon workshops Program.We are glad to inform you that after reviewing your application, you have passed the filtration phase with the pool of selected applicants who fit our workshop criteria. You will receive another email soon to schedule an interview within the next week.</p>${extenstion}<p>Best wishes,<br>SemiColon team</p></div></html>`
        const email: email = {
          to: participant.email,
          subject: "Semicolon Workshop Application",
          html: emailBody,
        }
        emails.push(email);
    };
    return emails;
  }
  function ConstructBulkInterviewEmail(participants: ParticipantType[]){
    //TODO: filter out the already emailed participants
    participants = participants.filter(participant => participant.acceptanceStatus !== "scheduled");
    const emails: email[] = [];
    for (const participant of participants) {
      let emailBody = "";
      if(participant.firstPreference === "cprog"){
        emailBody = `<p>Dear ${participant.name},</p><p>We are writing to inform you that the interview schedule for the C/Embedded C workshop is now available.<br> Please find your designated interview time below: <br> <a href="http://bit.ly/semicolon-interviews"> http://bit.ly/semicolon-interviews</a> <br> </p><p>The interviews will be conducted via Google Meet with your camera on. Please ensure that you have a stable internet connection and a quiet environment during the interview.</p><p>Slots will be added every day, so please check back if you do not see a time that is suitable for you. The last day of interviews is June 26, 2023.</p><p>If you have any questions or concerns, you can contact us through our Facebook social page.</p><p>Thank you for your interest in the workshop. We look forward to hearing from you soon.</p><p>Best regards,<br>SemiColon team</p>`;
      }
      
      const email: email = {
        to: participant.email,
        subject: "Semicolon Workshop Interview",
        html: emailBody,
      }
      emails.push(email);
      }
    return emails;
    }
  
  
  function ConstructBulkAcceptanceEmail(participants: ParticipantType[]){
  
  }
  function ConstructBulkRejectionEmail(participants: ParticipantType[]){
  
  }
  const mailFunc: {
    initial: (participants: ParticipantType[]) => email[];
    interview: (participants: ParticipantType[]) => email[];
  } = {
    initial: ConstructBulkInitialEmails,
    interview: ConstructBulkInterviewEmail,
  };

  export default mailFunc;