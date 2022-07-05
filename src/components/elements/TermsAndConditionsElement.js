export default function TermsAndConditionsElement(props) {
  const { suffix } = props;
  return (
    <div className="arc_terms_conditions_privacy_policy">
      <div> Please read our </div>
      <span className="arc_t_c">Terms and Conditions</span>
      and
      <span className="arc_p_p">Privacy Policy</span>
      <div> {suffix ? suffix : null} </div>
    </div>
  );
}
