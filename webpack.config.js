// import
// path : node.js에서 제공하는 전역 모듈
const { dirname } = require('path')
const path = require('path')

// import html-webpack-plugin
const HtmlPlugin = require('html-webpack-plugin')

// 파일 읽기 패키지.
const CopyPlugin = require('copy-webpack-plugin')

// export
module.exports = {
  // entry : 파일을 읽어들이기 시작하는 진입점 설정 == parcel index.html
  // webpack은 html이 아닌 js를 진입점으로 사용
  entry: './js/main.js',

  // output: 결과물(번들)을 반환하는 설정
  // entry를 통해 읽어들인 파일의 기본적인 연결관계를 webpack이 분석하여 결과를
  // 내어주는 기본적인 구성을 작성, 객체 데이터를 통해 내용 추가
  // 대표적인 옵션: path, filename
  output: {

    // path: 어떤 경로에 결과물을 저장할 지를 지정.
    // (node.js에서 요구하는) 절대 경로를 지정할 것.
    // __dirname : node.js에서 제공하는 전역 변수. 현재 파일이 있는 경로를 출력
    // dist 폴더에 결과물 
    // resolve() : 인수1과 인수2의 경로를 병합시켜줌.
    /*path: path.resolve(__dirname, 'dist'),

    // 저장하는 파일 이름
    filename: 'main.js',*/

    // path와 filename 옵션 주석 처리.
    // path는 기본적으로 dist 폴더로 설정되어 있음.
    // filename은 entry에 지정한 파일 이름으로 설정됨.
    // 결과적으로 path와 filename은 기본 설정 사용 시 지정할 필요 없음.

    // clean: filename 변경 시, 기존에 존재하던 파일을 삭제
    clean: true
  },

  // plugins: 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [

      // 브라우저에서 페이지를 확인
    new HtmlPlugin({
      template: './index.html'
    }),

    // copy-webpack-plugin 사용하기.
    // 특정 폴더에있는 (혹은 그 폴더 자체를) 다른 폴더로 복붙해줌.
    new CopyPlugin({
      patterns: [
        { from: 'static'} // 생성한 폴더 이름 지정
                          // static 폴더 안의 파일들이 복사 되어,
                          // dist 폴더 안에 생성됨.
      ]
    })
  ],

    //개발 서버 실행에 오류 발생 시
  devServer: {
    host: 'localhost'
  },


  // module:  프로젝트 내에서 다른 유형의 모듈을 처리하는 방법을 결정.
  module: {
    rules: [
      {
        // test 속성으로 해당 내용을 매칭하여 use 속성에 해당하는 패키지를 사용.
        test: /.s?css$/,  //정규식을 생성하여 파일 검사, 확장자가 .scss 또는 .css인 파일을 찾는다.

        use: [
          // **순서 중요** 
          // 먼저 사용 되는 로더 : css-loader

          // styleloader: 해석된 내용을 style-loader가 html 부분에 style 태그 부분에 해석된 내용을 삽입. 
          'style-loader', // css를 읽는 모듈

          // css-lodaer: 기본적으로 js 파일에서 css 파일을 해석할 수 없으므로, css-loader를 이용해
          // css 파일을 해석.
          'css-loader',    // css를 읽는 모듈

          // 스타일의 후처리를 돕는 패키지 'postcss'를 webpack에 동작시키기 위한 로더
          'postcss-loader',

          // sass-loader: sass 파일을 해석.
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }


}