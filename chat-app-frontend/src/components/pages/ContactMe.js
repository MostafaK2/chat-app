import email from "../images/ContactInfoLogo/emaillogo.png";
import linkedIn from "../images/ContactInfoLogo/linkedInLogo.png";
import github from "../images/ContactInfoLogo/githubLogo.png";

function ContactMe() {
  const height = 80;
  const width = 80;
  return (
    <div className="registration">
      <div className>
        <div>
          <a href="mailto:Mostafajunayed20@gmail.com">
            <img src={email} alt="email logo" width={width} height={height} />
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/mostafa-kamal-5622331b7/">
            <img
              src={linkedIn}
              alt="linkedIn logo"
              width={width}
              height={height}
            />
          </a>
        </div>
        <div>
          <a href="https://github.com/mostafak2">
            <img src={github} alt="github logo" width={width} height={height} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactMe;
