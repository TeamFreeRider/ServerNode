#include <cstdint>
#include <vector>
#include <bsoncxx/json.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/stdx.hpp>
#include <mongocxx/uri.hpp>
#include <iostream>
#include "opencv2/opencv.hpp"


mongocxx::uri uri("mongodb://celine:0522@ds157677.mlab.com:57677/freerider");
mongocxx::client client(uri);

using namespace std;
using namespace cv;

int red_threshold = 230;
int other_threshold = 150;

int is_red(Mat frame, int row, int col);

void fill_black(Mat frame, int row, int col);


int main(int, char **) {

    //db access
    mongocxx::database db = client["freerider"];
    mongocxx::collection Location = db["Location"];



    //image prcss
    VideoCapture capture = VideoCapture(0);

    int red_position_x, red_position_y, red_count;
    red_position_x = red_position_y = red_count = 0;


    while(waitKey(1) != 'q') {
        Mat frame;
        capture >> frame;

        for(int row = 0; row < frame.rows; row++) {
            for(int col = 0; col < frame.cols; col++) {
                if(!is_red(frame, row, col)) {
                    fill_black(frame, row, col);
                } else {
                    red_position_x += col;
                    red_position_y += row;
                    red_count += 1;
                }
            }
        }

	if (red_count != 0) {
            red_position_x /= red_count;
            red_position_y /= red_count;
	}

        imshow("frame", frame);

        std::cout << red_position_x << ", " << red_position_y << std::endl;

	// insert variables to db
	mongocxx::Location::insert_one Location.x = red_position_x.insert_one(doc);
	mongocxx::Location::insert_one Location.y = red_position_y.insert_one(doc);

    }
    return 0;

}


int is_red(Mat frame, int row, int col) {
    return
            frame.at<Vec3b>(row, col)[0] < other_threshold &&
            frame.at<Vec3b>(row, col)[1] < other_threshold &&
            frame.at<Vec3b>(row, col)[2] > red_threshold;
}

void fill_black(Mat frame, int row, int col) {
    for(int i = 0; i < 3; i++) {
        frame.at<Vec3b>(row, col)[i] = 0;
    }
}

