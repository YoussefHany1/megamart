import './signIn.css'

function App() {
    return (
    <>
        <div className="modal fade" id="signModal" tabIndex="-1" aria-labelledby="signModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body z-2">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <form className="popup z-2 overflow-hidden rounded-4 d-flex flex-column px-3">
                            <h1 className="logo text-center fw-bold mb-5 text">MegaMart</h1>
                            <label hidden htmlFor="email" className="form-label"><b>Email:</b></label>
                            <input type="email" className="email form-control rounded-3 border-0 mb-4" id="email" aria-describedby="emailHelp" name="email" placeholder="Email address or phone number" required />
                            
                            <label hidden htmlFor="password" className="form-label"><b>Password:</b></label>
                            <input type="password" className="password form-control rounded-3 border-0 mb-3" id="password" name="password" placeholder="Password" required />
                            
                            <div className="form-check mb-4">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">remember me</label>
                            </div>
                                            
                            <div className="forget mb-2"><a href="#" className="text-decoration-none fw-semibold">Forget password?</a></div>
                            <div className="signup">Don&apos;t have an account? <a href="#" className="text-decoration-none fw-bold">Sign up</a></div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="close btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="sign btn btn-primary">Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default App
