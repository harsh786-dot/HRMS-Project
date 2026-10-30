import "./AccountAccess.css"
import { STRINGS } from "../../../constants/strings"

const AccountAccess = ({form, handleChange}) => {
  return (
    <div className="personal-information">
      <div className="personal-form">

        <div className="form-group">
          <input type="Email" placeholder={STRINGS.ENTER_EMAIL}
          value={form.email}
            onChange={(e) =>handleChange("email", e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder={STRINGS.ENTER_SLACK}
          value={form.slack_id}
            onChange={(e) =>handleChange("slack_id", e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder={STRINGS.ENTER_SKYPE}
          value={form.skype_id}
            onChange={(e) =>handleChange("skype_id", e.target.value)} />
        </div>

        <div className="form-group">
          <input type="text" placeholder={STRINGS.ENTER_GIT}
          value={form.github_id}
            onChange={(e) =>handleChange("github_id", e.target.value)} />
        </div>

      </div>
    </div>
  )
}

export default AccountAccess
