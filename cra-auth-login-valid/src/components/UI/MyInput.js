function MyInput({ type, placeholder, value, setValue, error }) {
  return (
    <div className="form-group">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className={error ? "form-control is-invalid" : "form-control"}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default MyInput;
