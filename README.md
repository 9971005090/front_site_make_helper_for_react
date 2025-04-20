# 개발방향
- 라우터는 동적(url을 분석하여 처리)으로 처리
  - 예) test.com/member/add
     - / 기준으로 1첫째는 기능(그룹) - controller
     - / 기준으로 2첫째는 세부처리 - action
  - 기본적으로 기능(그룹-메뉴) 이동은 내부 훅인 useNavigate 사용
  - 루트 접속(/) 또는 인증이 종료시 로그인 이동은 수동으로 history 객체의 값을 직접업데이트 하고, 적절하게 new PopStateEvent(`popstate`) 를 사용하여 react에게 변경을 알려준다.
- 최소한의 전역 상태를 관리하고, 대부분의 콤포넌트를 동적으로 로딩하여 초기 로딩 속도를 높힌다.
- 동적으로 생성한 콤포넌트 제거를 위한 unmount 를 독립적으로 관리한다.
- 하나의 콤포넌트에서 데이터 처리/디자인 처리를 함께하지 않고, 분리하여 처리를 한다.
  - 데이터 처리 콤포넌트에서 동적으로 디자인 처리 콤포넌트를 동적으로 로딩하여 사용한다.(mvc 개념, mc가 데이터처리, v가 디자인 처리)
- 디자인 처리 콤포넌트에서 이벤트를 직접 관리하지 않고, 데이터 처리 콤포넌트에서 관리를 한다.
  - 디자인 처리 콤포넌트에 랜더링 후 호출되는 콜백함수를 전달해, 데이터 처리 콤포넌트에서 관리를 할 수 있다.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
