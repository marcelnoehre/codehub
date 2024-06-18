(defn fibonacci []
  (letfn [(fib [a b]
            (lazy-seq (cons a (fib b (+ a b)))))]
    (fib 0 1)))

(print (take 10 (fibonacci)))