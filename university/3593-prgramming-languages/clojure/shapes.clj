(defprotocol Shape
  (area [this])
  (textual-representation [this]))

(defrecord Point [x y]
  Shape
  (area [_] 0)
  (textual-representation [_] 
    (str "Point at (" x ", " y ")")))

(defrecord Line [start end]
  Shape
  (area [_] 0)
  (textual-representation [_] 
    (str "Line from " (textual-representation start) " to " (textual-representation end))))

(defrecord Circle [c r]
  Shape
  (area [_] (* Math/PI r r))
  (textual-representation [_] 
    (str "Circle with center (" c ") and radius " r)))

(defrecord Rectangle [tl w h]
  Shape
  (area [_] (Math/abs (* w h)))
  (textual-representation [_] 
    (str "Rectangle with top left corner (" textual-representation tl ") , width (" w ") and height (" h ")")))

(defn example []
  (let [p1 (->Point 0 0) 
        p2 (->Point 3 4) 
        shapes [(->Point 1 1)
                (->Line p1 p2)
                (->Circle p1 5)
                (->Rectangle p1 4 3)]]
    (doseq [shape shapes]
      (println (textual-representation shape))
      (println "Area:" (area shape))
      (println))))

(example)